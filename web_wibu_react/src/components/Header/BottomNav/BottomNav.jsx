import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BottomNav.css';
import genresData from '../../../data_and_source/genres.json';

function BottomNav() {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showGenres, setShowGenres] = useState(false);
  const genresRef = useRef(null);

  useEffect(() => {
    const initializeNav = () => {
      const topNavHeight = isHomePage ? 60 : 40;
      
      // Cập nhật classes dựa trên trang hiện tại
      navRef.current.classList.toggle('bottom-nav--compact', !isHomePage);
      wrapperRef.current.classList.toggle('bottom-nav__wrapper--compact', !isHomePage);
      
      // Lưu vị trí ban đầu của BottomNav
      originalPositionRef.current = navRef.current.offsetTop;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        
        if (scrollY >= originalPositionRef.current - topNavHeight) {
          navRef.current.classList.add('sticky');
          navRef.current.style.top = `${topNavHeight}px`;
          wrapperRef.current.style.display = 'block';
        } else {
          navRef.current.classList.remove('sticky');
          navRef.current.style.top = '0';
          wrapperRef.current.style.display = 'none';
        }
      };

      // Reset scroll position khi thay đổi trang
      window.scrollTo(0, 0);
      handleScroll();

      let ticking = false;
      const scrollListener = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', scrollListener);
      return () => window.removeEventListener('scroll', scrollListener);
    };

    initializeNav();
  }, [isHomePage]); // Dependency array với isHomePage

  useEffect(() => {
    function handleClickOutside(event) {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setShowGenres(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div 
        className={`bottom-nav__wrapper ${!isHomePage ? 'bottom-nav__wrapper--compact' : ''}`} 
        ref={wrapperRef}
      ></div>
      <nav 
        className={`bottom-nav ${!isHomePage ? 'bottom-nav--compact' : ''}`} 
        ref={navRef}
      >
        <div className="bottom-nav__container">
          <ul className="bottom-nav__list">
            <li className="bottom-nav__item" ref={genresRef}>
              <div 
                className="bottom-nav__link"
                onClick={() => setShowGenres(!showGenres)}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-tags"></i>
                Thể loại
                <i className={`fas fa-chevron-${showGenres ? 'up' : 'down'} ml-1`}></i>
              </div>
              <div className={`genres-dropdown ${showGenres ? 'show' : ''}`}>
                <ul className="genres-list">
                  {genresData.genres.map(genre => (
                    <li key={genre.id}>
                      <NavLink 
                        to={`/the-loai/${genre.slug}`}
                        className="genre-item"
                        onClick={() => setShowGenres(false)}
                      >
                        {genre.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/lich-phat-hanh" className="bottom-nav__link">
                <i className="far fa-calendar-alt"></i>
                Lịch phát hành
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/dang-truyen" className="bottom-nav__link">
                <i className="fas fa-upload"></i>
                Đăng truyện
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/cua-hang" className="bottom-nav__link">
                <i className="fas fa-store"></i>
                Cửa hàng
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/bang-xep-hang" className="bottom-nav__link">
                <i className="fas fa-trophy"></i>
                Bảng xếp hạng
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/quy-dinh" className="bottom-nav__link">
                <i className="fas fa-book"></i>
                Quy định
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default BottomNav;